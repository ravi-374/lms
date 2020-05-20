<?php

namespace App\Imports;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Book;
use App\Traits\ImageTrait;
use Arr;
use DB;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Log;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Validators\Failure;

class BookImport implements ToCollection, SkipsOnFailure
{
    use SkipsFailures;

    /**
     * @param  Collection  $rows
     *
     * @throws ApiOperationFailedException
     */
    public function collection(Collection $rows)
    {
        try {
            DB::beginTransaction();

            // convert to array and remove header from array
            $row = $rows->toArray();
            $bookArray = Arr::except($row, '0');

            // TODO :: need to uncomment after adding of skipOnFailure
            // validate date 
//            foreach ($bookArray as $book) {
//                Validator::make($book, [
//                    '3' => 'nullable|date_format:Y-m-d H:i:s',
//                ])->validate();
//            }
            
            foreach ($bookArray as $row) {
                // check if book exists
                $bookExists = Book::whereName($row[0])->exists();
                if (! $bookExists) {
                    // set image URL
                    if (! empty($row[1])) {
                        $row[1] = ImageTrait::makeImageFromURL($row[1], Book::IMAGE_PATH);
                    }

                    // import books
                    Book::create([
                        'name'         => $this->isEmpty($row[0]),
                        'image'        => $this->isEmpty($row[1]),
                        'description'  => $this->isEmpty($row[2]),
                        'published_on' => $this->isEmpty($row[3]),
                        'isbn'         => $this->isEmpty($row[4]),
                        'url'          => $this->isEmpty($row[5]),
                        'is_featured'  => ($this->isEmpty($row[6]) == 'Yes') ? 1 : 0,
                    ]);
                }
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            throw new ApiOperationFailedException($e->getMessage());
        }
    }

    /**
     * @param $value
     *
     * @return null
     */
    public function isEmpty($value)
    {
        if (isset($value) && ! empty($value)) {
            return $value;
        }

        return null;
    }

    /**
     * @inheritDoc
     */
    public function onFailure(Failure ...$failures)
    {
        foreach ($failures as $failure) {
            $failure->errors(); // Actual error messages from Laravel validator
            Log::info($failure->values()[0]); // The values of the row that has failed.
        }
    }
}
