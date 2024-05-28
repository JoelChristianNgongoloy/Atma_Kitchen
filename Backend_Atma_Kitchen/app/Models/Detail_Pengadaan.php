<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail_Pengadaan extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'detail_pengadaan';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id_bahan_baku',
        'id_pengadaan',
        'total_harga',
        'jumlah_bahan_baku'
    ];

    public function bahanBaku()
    {
        return $this->belongsTo(BahanBaku::class, 'id_bahan_baku');
    }

    public function pengadaan()
    {
        return $this->belongsTo(Pengadaan::class, 'id_pengadaan');
    }
}
