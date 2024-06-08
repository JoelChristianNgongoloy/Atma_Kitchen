<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'pesanan';
    protected $primaryKey = 'id';

    protected $fillable = [
        "jumlah_produk",
        'total_harga',
        'status_pesanan',
        'tanggal_pesan',
        'tanggal_kirim',
        'id_customer',
        'bukti_pembayaran',
        'id_alamat',
        'jenis_pengantaran',
        'jarak_pengiriman',
        'ongkos_kirim',
        'jumlah_tip',
        'tanggal_diproses'
    ];

    public function customer()
    {
        return $this->belongsTo(User::class, 'id_customer');
    }

    public function detailPesanan() {
        return $this->hasMany(Detail_Pesanan::class, 'id_pesanan');
    }

    public function alamat()
    {
        return $this->belongsTo(Alamat::class, 'id_alamat');
    }

    protected $casts = [
        'tanggal_kirim' => 'datetime',
    ];
}
