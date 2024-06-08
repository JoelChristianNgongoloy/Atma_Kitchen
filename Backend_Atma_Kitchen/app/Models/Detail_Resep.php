<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail_Resep extends Model
{
    use HasFactory;
    
    public $timestamps = false;
    
    protected $table = 'detail_resep';
    
    protected $primaryKey = 'id_detail_resep';
    
    protected $fillable = [
        'id_bahan_baku',
        'id_resep',
        'jumlah',
        'satuan',
    ];

    // Relationship with Detail_Pesanan
    public function detailPesanan()
    {
        return $this->belongsTo(Detail_Pesanan::class, 'id_pesanan');
    }

}
