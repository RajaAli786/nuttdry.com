<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeaderSetting extends Model
{
    protected $table = 'header_setting';

    protected $fillable = [
        'logo',
        'favicon',
        'topbar_heding',
        'contact_number',
        'email',
        'address',
        'facebook_link',
        'instagram_link',
        'youtube_link',
        'whatsapp_number',
        'linkedin_link',
        'twitter_link',
        'cta_text',
        'cta_link',
        'page_title',
        'meta_keyword',
        'meta_description',
    ];
}
