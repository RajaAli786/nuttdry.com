<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFooterSettingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('footer_setting', function (Blueprint $table) {
            $table->id();

            // Basic Info
            $table->string('footer_logo')->nullable();
            $table->text('about_text')->nullable();

            // Contact Info
            $table->string('contact_number')->nullable();
            $table->string('email')->nullable();
            $table->string('address')->nullable();

            // Social Links
            $table->string('facebook_link')->nullable();
            $table->string('instagram_link')->nullable();
            $table->string('youtube_link')->nullable();
            $table->string('twitter_link')->nullable();
            $table->string('linkedin_link')->nullable();
            $table->string('whatsapp_number')->nullable();
            $table->string('timings')->nullable();

            // Footer Columns (Optional)
            $table->string('column1_title')->nullable();
            $table->text('column1_links')->nullable(); // JSON or CSV

            $table->string('column2_title')->nullable();
            $table->text('column2_links')->nullable();

            $table->string('column3_title')->nullable();
            $table->text('column3_links')->nullable();

            // Copyright Text
            $table->string('copyright_text')->nullable();

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
        Schema::dropIfExists('footer_setting');
    }
}
