<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Foundation\Auth\User as Authenticatable;

class Pegawai extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'pegawai';
    protected $primarykey = 'id';

    protected $fillable = [
        'jumlah_bolos',
        'gaji_pegawai',
        'bonus_gaji',
        'id_user',
    ];

    public function User(){
        return $this->belongsTo(User::class, 'id_user');        
    }
}
