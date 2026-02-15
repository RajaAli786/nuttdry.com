<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HeaderSettingController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\SliderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RazorpayController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\FooterController;
use App\Http\Controllers\Api\ProductReviewController;
use App\Http\Controllers\Api\PageController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| These routes are loaded by RouteServiceProvider within the "api" group.
|--------------------------------------------------------------------------
*/

// Public Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public Header Settings Route
Route::get('/menus', [MenuController::class, 'index']);
Route::get('/header-setting', [HeaderSettingController::class, 'index']);
Route::get('/footer-setting', [FooterController::class, 'index']);
Route::get('/footer-menu', [FooterController::class, 'footerMenus']);
Route::get('/sliders', [SliderController::class, 'index']);

// Public Product Routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/price-range', [ProductController::class, 'priceRange']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/page/{id}', [PageController::class, 'show']); 


// Public Product Review Routes
Route::post('/reviews', [ProductReviewController::class, 'store']);
Route::get('/reviews/{product_id}', [ProductReviewController::class, 'index']);


// Public Categories Route
Route::get('/categories', [ProductController::class, 'categories']);
Route::get('/categories/{id}', [ProductController::class, 'categoryById']);

// Public Coupon Route
Route::post('/coupon/validate', [CouponController::class, 'validateCoupon']);

Route::post('/razorpay/create-order', [RazorpayController::class, 'createOrder']);
Route::post('/razorpay/verify-payment', [RazorpayController::class, 'verifyPayment']);

Route::get('/testimonials', [TestimonialController::class, 'index']);

// Protected Routes (require Sanctum Token)
Route::middleware('auth:sanctum')->group(function () {

    // Logout User
    Route::post('/logout', [AuthController::class, 'logout']);

    // Logged-in User Details
    Route::get('/user', [AuthController::class, 'user']);

    Route::post('/place-order', [OrderController::class, 'placeOrder']);
    Route::get('/orders', [OrderController::class, 'index']);

});

