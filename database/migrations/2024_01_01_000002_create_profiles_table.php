<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('phone')->nullable();
            $table->text('bio')->nullable();
            $table->string('avatar')->nullable();
            $table->string('location')->nullable();
            $table->string('cv_path')->nullable();
            $table->string('specialty')->nullable();
            $table->year('graduation_year')->nullable();
            $table->string('company_name')->nullable();
            $table->string('website')->nullable();
            $table->string('sector')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('profiles'); }
};
