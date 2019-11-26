<?php

namespace App\Repositories;

use App\Exceptions\ApiOperationFailedException;
use App\Models\Testimonial;
use App\Repositories\Contracts\TestimonialRepositoryInterface;
use App\Traits\ImageTrait;
use Exception;

/**
 * Class TestimonialRepository
 */
class TestimonialRepository extends BaseRepository implements TestimonialRepositoryInterface
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Testimonial::class;
    }

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     *
     * @return Testimonial
     */
    public function store($input)
    {
        try {
            if (isset($input['photo']) && ! empty($input['photo'])) {
                $input['image'] = ImageTrait::makeImage($input['photo'], Testimonial::IMAGE_PATH);
            }

            return Testimonial::create($input);
        } catch (Exception $e) {
            if (isset($input['image']) && ! empty($input['image'])) {
                Testimonial::deleteImage(Testimonial::IMAGE_PATH.DIRECTORY_SEPARATOR.$input['image']);
            }
            throw new ApiOperationFailedException($e->getMessage());
        }
    }

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @throws ApiOperationFailedException
     *
     * @return Testimonial
     */
    public function update($input, $id)
    {
        /** @var Testimonial $testimonial */
        $testimonial = $this->findOrFail($id);

        try {

            if (isset($input['photo']) && ! empty($input['photo'])) {
                $testimonial->deleteTestimonialImage();
                $input['image'] = ImageTrait::makeImage($input['photo'], Testimonial::IMAGE_PATH);
            }

            $testimonial->update($input);

            return $testimonial->fresh();
        } catch (Exception $e) {
            if (isset($input['image']) && ! empty($input['image'])) {
                Testimonial::deleteImage(Testimonial::IMAGE_PATH.DIRECTORY_SEPARATOR.$input['image']);
            }
            throw new ApiOperationFailedException($e->getMessage());
        }
    }
}
