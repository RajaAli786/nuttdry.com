<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();

            $table->string('code')->unique();     // SAVE50
            $table->string('title')->nullable();

            $table->enum('type', ['flat', 'percent'])->default('flat');
            // flat = ₹50
            // percent = 10%

            $table->decimal('value', 10, 2);

            $table->decimal('min_order_amount', 10, 2)->nullable();

            $table->integer('usage_limit')->nullable(); // total uses
            $table->integer('used_count')->default(0);

            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};

