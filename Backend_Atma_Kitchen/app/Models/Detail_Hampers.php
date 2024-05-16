<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Hampers;
use App\Models\Produk;

class Detail_Hampers extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'detail_hampers';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id_produk',
        'id_hampers',
    ];

    public function Hampers()
    {
        return $this->belongsTo(Hampers::class, 'id_hampers');
    }
    public function Produk()
    {
        return $this->belongsTo(Produk::class, 'id_produk');
    }
}
