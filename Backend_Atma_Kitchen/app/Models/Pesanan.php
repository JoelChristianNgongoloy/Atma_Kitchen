<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = "pesanan";
    protected $primaryKey = "id_pesanan";

    protected $fillable = [
        'jumlah_produk',
        'total_harga',
        'status_pesanan',
        'bukti_pembayaran',
        'tanggal_pesan',
        'tanggal_kirim',
        'id_customer',
    ];

    public function Customer() {
        return $this->belongsTo(Customer::class, 'id_customer');
    }
}