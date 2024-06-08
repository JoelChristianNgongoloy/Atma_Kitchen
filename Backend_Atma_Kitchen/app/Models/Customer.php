<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = "customer";
    protected $primaryKey = "id";

    protected $fillable = [
        'saldo',
        'poin',
        'id_user',
    ];

    public function User()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function pesanan()
    {
        return $this->hasMany(Pesanan::class, 'id_customer');
    }
}
