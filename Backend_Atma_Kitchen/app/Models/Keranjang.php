<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keranjang extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "keranjang";
    protected $primaryKey = "id";

    protected $fillable = [
        'id_produk',
        'id_user',
        'jumlah_produks'
    ];

    public function produk()
    {
        return $this->belongsTo(Produk::class, 'id_produk');
    }


    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
