<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEpisodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('episodes', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('season')->nullable();
            $table->string('episode')->nullable();
            $table->string('slug')->unique();
            $table->string('date')->nullable();
            $table->longText("description")->nullable();
            $table->string('links')->nullable();
            $table->string('import_slug')->nullable();
            $table->string('import_website')->nullable();
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
        Schema::dropIfExists('episodes');
    }
}
