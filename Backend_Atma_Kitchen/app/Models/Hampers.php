<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Detail_Hampers;

class Hampers extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'hampers';
    protected $primaryKey = 'id';

    protected $fillable = [
        'nama_hampers',
        'deskripsi_hampers',
        'harga_hampers',
        'gambar_hampers',
        'stok_hampers',
        'jenis_hampers'
    ];

    public function detailHampers()
    {
        return $this->hasMany(Detail_Hampers::class, 'id_hampers');
    }
}
