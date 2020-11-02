<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Orders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id'); 
            $table->string('userId');
            $table->decimal('allPrice', 15, 2); //копеек
            $table->decimal('deliveryPrice', 15, 2)->nullable(); //копеек
            $table->string('deliveryType');
            $table->string('name');
            $table->string('adress')->nullable();
            $table->string('tel');
            $table->string('status');
            $table->string('payId')->nullable();
            $table->json('properties');
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
        Schema::dropIfExists('orders');
    }
}
