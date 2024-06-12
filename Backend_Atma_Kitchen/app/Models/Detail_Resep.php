<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail_Resep extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'detail_resep';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_detail_pengadaan',
        'id_resep',
        'jumlah',
        'satuan',
    ];

    public function detailPengadaan() {
        return $this->belongsTo(Detail_Pengadaan::class, "id_detail_pengadaan");
    }
    public function resep() {
        return $this->belongsTo(Resep::class, "id_resep");
    }
}
