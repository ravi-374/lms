<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSeriesBooksTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('series_books', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('series_id')->unsigned();
            $table->integer('book_id')->unsigned();
            $table->integer('sequence');
            $table->timestamps();

            $table->foreign('series_id')->references('id')->on('book_series')
                ->onDelete('set null')
                ->onUpdate('set null');

            $table->foreign('book_id')->references('id')->on('books')
                ->onDelete('set null')
                ->onUpdate('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('series_books');
    }
}
