<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBooksTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->text('description');
            $table->string('image')->nullable();
            $table->datetime('published_on')->nullable();
            $table->unsignedInteger('author_id');
            $table->unsignedInteger('publisher_id')->nullable();
            $table->float('price');
            $table->string('isbn')->nullable();
            $table->string('url')->nullable();
            $table->unsignedInteger('language_id');
            $table->boolean('is_featured')->default(false);
            $table->timestamps();

            $table->foreign('author_id')
                ->references('id')->on('authors')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('publisher_id')
                ->references('id')->on('publishers')
                ->onDelete('set null')
                ->onUpdate('set null');

            $table->foreign('language_id')
                ->references('id')->on('book_languages')
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
        Schema::dropIfExists('books');
    }
}
