<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Saldo extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = "id_penarikan";
    protected $table = "penarikan";

    protected $fillable = [
        'id_customer',
        'tanggal_penarikan',
        'status_penarikan',
        'total_penarikan',
    ];

    public function User()
    {
        return $this->belongsTo(User::class, 'id_customer');
    }
}