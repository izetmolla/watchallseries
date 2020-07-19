<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSerialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('serials', function (Blueprint $table) {
            $table->id();
            $table->string("serialId")->nullable();
            $table->string("title")->nullable();
            $table->string("thumbnail")->nullable();
            $table->string("released_date")->nullable();
            $table->longText("description")->nullable();
            $table->string("slug")->unique();
            $table->string("import_slug")->nullable();
            $table->string("import_website")->nullable();
            $table->string("status")->default("draft");
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
        Schema::dropIfExists('serials');
    }
}
