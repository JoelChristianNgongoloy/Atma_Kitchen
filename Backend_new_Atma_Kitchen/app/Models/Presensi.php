<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presensi extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'presensi';
    protected $primaryKey = 'id';

    protected $fillable = [
        'tanggal_presensi',
        'status_presensi',
        'id_user',
    ];

    public function User(){
        return $this->belongsTo(User::class, 'id_user');
    }
}
