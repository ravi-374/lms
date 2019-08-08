<?php

namespace App\Http\Controllers;

use InfyOm\Generator\Utils\ResponseUtil;
use Response;
use Validator;

/**
 * @SWG\Swagger(
 *   basePath="/api/v1",
 *   @SWG\Info(
 *     title="Laravel Generator APIs",
 *     version="1.0.0",
 *   )
 * )
 * This class should be parent class for other API controllers
 * Class AppBaseController
 */
class AppBaseController extends Controller
{
    /**
     * @param  array|mixed  $result
     * @param  string  $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendResponse($result, $message)
    {
        return Response::json(ResponseUtil::makeResponse($message, $result));
    }

    /**
     * @param  string  $error
     * @param  int  $code
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendError($error, $code = 500)
    {
        return Response::json(ResponseUtil::makeError($error), $code);
    }

    /**
     * @param  string  $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendSuccess($message)
    {
        return Response::json([
            'success' => true,
            'message' => $message
        ], 200);
    }

    /**
     * @param $result
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendCustomResponce($result, $message){
        $responce = [
            'success' => true,
            'message' => $message
        ];
        if(isset($result['totalRecord'])) {
            $responce['totalRecord'] = $result['totalRecord'];
            unset($result['totalRecord']);
        }
        $responce['data'] = $result;
        return Response::json($responce, 200);
    }

}
