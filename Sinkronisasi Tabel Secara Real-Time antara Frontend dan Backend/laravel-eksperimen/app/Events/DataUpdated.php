<?php

namespace App\Events;

use App\Models\Data; // Tambahkan use statement untuk model Data
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DataUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $data;

    /**
     * Create a new event instance.
     *
     * @param  \App\Models\Data  $data
     * @return void
     */
    public function __construct(Data $data)
    {
        $this->data = $data;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel
     */
    public function broadcastOn(): Channel
    {
        return new Channel('data-updates'); // Gunakan channel publik jika ingin
    }

    /**
     * Data yang akan disiarkan
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->data->id,
            'name' => $this->data->name,
            'email' => $this->data->email,
        ];
    }
}
