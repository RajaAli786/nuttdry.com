<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HeaderSettingController;
use App\Http\Controllers\FooterSettingController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\CkeditorController;
use App\Http\Controllers\CouponController;


/*
|--------------------------------------------------------------------------
| Public Routes (Login)
|--------------------------------------------------------------------------
*/
Route::get('/clear-cache', function() {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');
    return "Cache Cleared";
});



Route::get('/', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.submit');

/*
|--------------------------------------------------------------------------
| Protected Routes (Require Auth)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {

    Route::post('/ckeditor/upload', [CkeditorController::class, 'upload'])->name('ckeditor.upload');

    // Dashboard
    Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');

    // Logout
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

    /*
    |--------------------------------------------------------------------------
    | Category Routes
    |--------------------------------------------------------------------------
    */
    Route::prefix('categories')->name('categories.')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('index');
        Route::get('/add', [CategoryController::class, 'add'])->name('add');
        Route::post('/store', [CategoryController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [CategoryController::class, 'edit'])->name('edit');
        Route::put('/update/{id}', [CategoryController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [CategoryController::class, 'destroy'])->name('delete');
    });

    /*
    |--------------------------------------------------------------------------
    | Header & Footer Settings
    |--------------------------------------------------------------------------
    */
    Route::get('/header-setting', [HeaderSettingController::class, 'index'])->name('header-setting');
    Route::post('/header-setting', [HeaderSettingController::class, 'store'])->name('header-setting.save');

    Route::get('/footer-setting', [FooterSettingController::class, 'index'])->name('footer-setting');
    Route::post('/footer-setting', [FooterSettingController::class, 'store'])->name('footer-setting.save');

    /*
    |--------------------------------------------------------------------------
    | Slider Routes
    |--------------------------------------------------------------------------
    */
    Route::prefix('sliders')->name('sliders.')->group(function () {
        Route::get('/', [SliderController::class, 'index'])->name('index');
        Route::get('/create', [SliderController::class, 'create'])->name('create');
        Route::post('/store', [SliderController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [SliderController::class, 'edit'])->name('edit');
        Route::post('/{id}/update', [SliderController::class, 'update'])->name('update');
        Route::delete('/{id}/delete', [SliderController::class, 'destroy'])->name('delete');
    });

    /*
    |--------------------------------------------------------------------------
    | Menu Routes
    |--------------------------------------------------------------------------
    */
    Route::prefix('menu')->name('menu.')->group(function () {
        Route::get('/', [MenuController::class, 'index'])->name('index');
        Route::get('/create', [MenuController::class, 'create'])->name('create');
        Route::post('/store', [MenuController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [MenuController::class, 'edit'])->name('edit');
        Route::post('/update/{id}', [MenuController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [MenuController::class, 'destroy'])->name('delete');
    });

    /*
    |--------------------------------------------------------------------------
    | Testimonial Routes
    |--------------------------------------------------------------------------
    */
    Route::prefix('testimonial')->name('testimonial.')->group(function () {
        Route::get('/', [TestimonialController::class, 'index'])->name('index');
        Route::get('/create', [TestimonialController::class, 'create'])->name('create');
        Route::post('/store', [TestimonialController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [TestimonialController::class, 'edit'])->name('edit');
        Route::post('/update/{id}', [TestimonialController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [TestimonialController::class, 'destroy'])->name('delete');
    });

    /*
    |--------------------------------------------------------------------------
    | Product Routes
    |--------------------------------------------------------------------------
    */
    Route::prefix('product')->name('product.')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('index');
        Route::get('/create', [ProductController::class, 'create'])->name('create');
        Route::post('/store', [ProductController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [ProductController::class, 'edit'])->name('edit');
        Route::put('/update/{id}', [ProductController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [ProductController::class, 'destroy'])->name('delete');
        Route::get('/image/{id}', [ProductImageController::class, 'destroy'])->name('image.delete');
    });

    Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('index');
        Route::get('/create', [OrderController::class, 'create'])->name('create');
        Route::post('/store', [OrderController::class, 'store'])->name('store');
        Route::post('/status-update', [OrderController::class, 'updateStatus'])->name('update');
        Route::get('/show/{id}',[OrderController::class, 'show'])->name('show');
    });

    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('/store', [UserController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [UserController::class, 'edit'])->name('edit');
        Route::post('/update/{id}', [UserController::class, 'update'])->name('update');
        Route::get('/status/{id}', [UserController::class, 'changeStatus'])->name('status');
        Route::delete('/delete/{id}', [UserController::class, 'destroy'])->name('delete');
    });

    Route::prefix('pages')->name('pages.')->group(function () {
        Route::get('/', [PageController::class, 'index'])->name('index');
        Route::get('create', [PageController::class, 'create'])->name('create');
        Route::post('store', [PageController::class, 'store'])->name('store');

        Route::get('edit/{id}', [PageController::class, 'edit'])->name('edit');
        Route::post('update/{id}', [PageController::class, 'update'])->name('update');
    });

    Route::prefix('coupons')->name('coupons.')->group(function () {
        Route::get('/', [CouponController::class, 'index'])->name('index');
        Route::get('/add', [CouponController::class, 'form'])->name('add');
        Route::post('/store', [CouponController::class, 'save'])->name('store');
        Route::get('/edit/{id}', [CouponController::class, 'form'])->name('edit');
        Route::post('/update/{id}', [CouponController::class, 'save'])->name('update');
    });


    Route::match(['get', 'post'], '/profile', [AuthController::class, 'changePassword'])->name('profile');

});
