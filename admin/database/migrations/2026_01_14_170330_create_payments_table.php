<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');       // Related order
            $table->unsignedBigInteger('user_id');        // User who made the payment
            $table->string('payment_id')->unique();       // Razorpay payment ID
            $table->decimal('order_amount', 10, 2);      // Amount paid
            $table->string('coupon_code')->nullable();   // Applied coupon
            $table->decimal('coupon_discount', 10, 2)->default(0); // Coupon discount
            $table->string('status')->default('pending'); // Payment status
            $table->string('payment_method')->default('razorpay'); // Payment method
            $table->timestamps();

            // Foreign keys (optional, if you have orders and users table)
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
