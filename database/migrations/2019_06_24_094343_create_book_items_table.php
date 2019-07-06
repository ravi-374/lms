<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBookItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('book_items', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('book_id');
            $table->string('book_item_id')->unique();
            $table->string('edition');
            $table->integer('format');
            $table->boolean('is_available')->default(1);
            $table->string('location');
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
        Schema::dropIfExists('book_items');
    }
}
