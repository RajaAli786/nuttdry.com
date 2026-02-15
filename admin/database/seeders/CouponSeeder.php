<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Coupon;

class CouponSeeder extends Seeder
{
    public function run(): void
    {
        Coupon::insert([
            [
                'code' => 'SAVE50',
                'title' => 'Flat ₹50 OFF',
                'type' => 'flat',
                'value' => 50,
                'min_order_amount' => 500,
                'usage_limit' => 100,
                'used_count' => 0,
                'start_date' => now(),
                'end_date' => now()->addMonths(1),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'code' => 'DISC10',
                'title' => '10% Discount',
                'type' => 'percent',
                'value' => 10,
                'min_order_amount' => 300,
                'usage_limit' => 200,
                'used_count' => 0,
                'start_date' => now(),
                'end_date' => now()->addMonths(2),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
