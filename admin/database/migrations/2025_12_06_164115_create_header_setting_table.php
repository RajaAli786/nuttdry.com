<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHeaderSettingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('header_setting', function (Blueprint $table) {
            $table->id();
            $table->string('logo')->nullable();
            $table->string('favicon')->nullable();

            $table->string('contact_number')->nullable();
            $table->string('email')->nullable();
            $table->string('address')->nullable();

            // Social Links
            $table->string('facebook_link')->nullable();
            $table->string('instagram_link')->nullable();
            $table->string('youtube_link')->nullable();
            $table->string('whatsapp_number')->nullable();
            $table->string('linkedin_link')->nullable();
            $table->string('twitter_link')->nullable();

            // Optional
            $table->string('cta_text')->nullable();
            $table->string('cta_link')->nullable();

            // SEO Fields
            $table->string('page_title')->nullable();
            $table->string('meta_keyword')->nullable();
            $table->text('meta_description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('header_setting');
    }
}
