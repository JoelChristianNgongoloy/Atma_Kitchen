<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = "id";
    protected $table = "transaksi";

    protected $fillable = [
        'id_pesanan',
        'id_pengembalian',
        'tanggal_transaksi',
        'jumlah_transaksi',
        'poin_didapatkan',
        'jumlah_tip',
        'jarak_pengiriman',
        'status_transaksi',
        'id_produk',
        'poin_now',
        'no_nota',
    ];

    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class, 'id_pesanan');
    }
    public function pengembalian()
    {
        return $this->belongsTo(Pengembalian::class, 'id_pengembalian');
    }
    public function produk()
    {
        return $this->belongsTo(Produk::class, 'id_produk');
    }
}
