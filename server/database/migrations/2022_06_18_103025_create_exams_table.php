<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('name');
            $table->text('description')->default('No description');
            $table->json('subject_ids');

            $table->boolean('started')->default(false);
            $table->boolean('completed')->default(false);

            $table->unsignedBigInteger('org_id');
            $table->foreign('org_id')->references('id')->on('organizations')->cascadeOnDelete()->cascadeOnUpdate()->nullable();

            $table->unsignedBigInteger('teacher_id');
            $table->foreign('teacher_id')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exams');
    }
};
