<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterSetting extends Model
{
    protected $table = 'footer_setting';

    protected $fillable = [
        'footer_logo',
        'about_text',
        'contact_number',
        'email',
        'address',

        'facebook_link',
        'instagram_link',
        'youtube_link',
        'twitter_link',
        'linkedin_link',
        'whatsapp_number',
        'timings',

        'column1_title',
        'column1_links',

        'column2_title',
        'column2_links',

        'column3_title',
        'column3_links',

        'copyright_text',

        'map_link',

        'page_title',
        'page_keyword',
        'page_description'
    ];
}
