<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alamat extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'alamat';
    protected $primaryKey = 'id';

    protected $fillable = [
        'alamat_customer',
        'kode_pos',
        'id_user',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'id_user');
    }
}
