<?php
/**
 * Company: InfyOm Technologies, Copyright 2019, All Rights Reserved.
 * Author: Vishal Ribdiya
 * Email: vishal.ribdiya@infyom.com
 * Date: 15-07-2019
 * Time: 12:54 PM
 */

namespace App\Exceptions;

use Exception;
use Throwable;
class MissingPropertyException extends Exception
{
    /**
     * MissingPropertyException constructor.
     *
     * @param string         $message
     * @param int            $code
     * @param Throwable|null $previous
     */
    public function __construct($message = '', $code = 422, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}