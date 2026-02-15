<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->boolean('is_top')->default(0)->after('is_featured');
            $table->string('meta_title')->nullable()->after('status');
            $table->string('meta_keyword')->nullable()->after('meta_title');
            $table->text('meta_description')->nullable()->after('meta_keyword');
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            $table->string('sku')->unique();
            $table->decimal('price', 10, 2);
            $table->decimal('old_price', 10, 2)->nullable();
            $table->string('image')->nullable();
        
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('menu_id')->nullable();
        
            $table->boolean('is_featured')->default(0);
            $table->decimal('discount', 5, 2)->default(0);
            $table->string('coupon_code')->nullable();
            $table->decimal('coupon_discount', 10, 2)->default(0);
            $table->boolean('status')->default(1);
        
            $table->timestamps();
        
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
            $table->foreign('menu_id')->references('id')->on('menus')->onDelete('set null');
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
