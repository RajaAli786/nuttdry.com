<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('parent_id')->nullable()->index(); 
            // null = main menu, otherwise submenu

            $table->string('title');
            $table->string('slug')->nullable();  // URL or route name
            $table->string('icon')->nullable();  // optional
            $table->integer('sort_order')->default(0);
            $table->boolean('status')->default(1);  // 1 = active, 0 = inactive

            $table->timestamps();

            // Foreign key for nested menus
            $table->foreign('parent_id')
                  ->references('id')->on('menus')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menus');
    }
}
