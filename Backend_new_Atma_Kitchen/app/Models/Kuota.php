<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kuota extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = "id";
    protected $table = "kuota";

    protected $fillable = [
        'id_produk',
        'tanggal_kuota',
        'loyang'
    ];

    public function Produk() {
        return $this->belongsTo(Produk::class, "id_produk");
    }

    public function Kuota() {
        return $this->hasMany(Kuota::class, 'id_produk');
    }
}
