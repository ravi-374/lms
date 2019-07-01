<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateIssuedBooksTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issued_books', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('book_item_id')->unsigned();
            $table->integer('member_id')->unsigned();
            $table->dateTime('reserve_date')->nullable();
            $table->dateTime('issued_on')->nullable();
            $table->dateTime('return_due_date')->nullable();
            $table->text('note')->nullable();
            $table->dateTime('return_date')->nullable();
            $table->integer('status');
            $table->timestamps();

            $table->foreign('book_item_id')
                ->references('id')->on('book_items')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('member_id')
                ->references('id')->on('members')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('issued_books');
    }
}
