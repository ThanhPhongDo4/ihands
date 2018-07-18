var p1 = '1';
var p0 = '0';
var status = 1;
module.exports = function(io) {
    io.on('connection', function(client) {
        client.emit('ack', {
            status: "success",
            id: client.id
        })
        client.on('message', (data) => {
            if((status == 1&&data == "1") || (status == 0 && data == "0"))	{
               console.log("Socket send:" + data);
               if(data == "1")
               {
                   io.sockets.emit('esp', '12');
                   status = 0;
               }		
               else
               if(data == "0")
               {
                   io.sockets.emit('esp', '22');
                   status = 1;
               }			
           }
           })
    })
}