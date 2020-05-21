<?php

namespace App\Imports;

use App\Models\Book;
use App\Traits\ImageTrait;
use Arr;
use Exception;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class BookImport implements ToCollection
{
    /**
     * @param  Collection  $rows
     */
    public function collection(Collection $rows)
    {
        // convert to array and remove header from array
        $row = $rows->toArray();
        $bookArray = Arr::except($row, '0');

        foreach ($bookArray as $row) {
            try {
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
            } catch (Exception $e) {
                continue;
            }
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
}
