

enum channels {
    One = "01",
    Two = "02",
    Three = "03",
    Four = "04",
    Five = "05",
    Six = "06",
    Seven = "07",
    Eight = "08",
    Nine = "09",
    Ten = "0A"

}

//% weight=10 color=#8bc34a icon="\uf1eb"

namespace iotloranode {
    serial.redirect(SerialPin.P14, SerialPin.P15, BaudRate.BaudRate115200);
    let payload = ""

    //%blockId="iotloranode_initialiseRadio" block="Initialise LoRa Radio: Device Address %deviceaddress|Network Session Key %netswk|App Session Key %appswk|SF %datarate"
    //% blockGap=8 
    export function initialiseRadio(devaddress: string, netswk: string, appswk: string, datarate: number): void {
        /**
     * First we need to configure the serial port to use the pins and reset the radio
     */
        pins.digitalWritePin(DigitalPin.P16, 0)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P16, 1)
        /**
         * For this we are only going to use ABP for now
         */
        basic.showNumber(1)
        serial.readLine()
        serial.writeString("at+set_config=dev_addr:" + devaddress + "\r\n");
        serial.readLine()
        basic.showNumber(2)
        serial.writeString("at+set_config=nwks_key:" + netswk + "\r\n");
        serial.readLine()
        basic.showNumber(4)
        serial.readLine()
        serial.writeString("at+set_config=apps_key:" + appswk + "\r\n");
        basic.showNumber(6)
        serial.readLine()
        serial.writeString("at+set_config=dr:" + datarate + "\r\n");
        basic.showNumber(8)
        serial.readLine()
        serial.writeString("at+join=abp\r\n");
        basic.showNumber(9)
        serial.readLine()


    }
    //%blockId="iotloranode_digitalValue"
    //%block="Add Digital Value: %value on channel: %id"
    export function digitalValue(value: boolean, chanNum: channels): void {
        /**
         * Add digital message
         */

        payload = payload + chanNum +"0001"

    }
    //%blockId="iotloranode_analogueValue" block="Add Analogue Value: %value"
    //% x.min=0 x.max=254
    export function analogueValue(value: number, id: channels): void {
        /**
         * Transmit Message
         */


    }

    //%blockId="iotloranode_tempertureValue" block="Add Temperature Value: $temperatureVal to %x=variables_get(text_payloadData) on channel: %id"
    export function tempertureValue(temperatureVal: number, x: string, id: channels): void {
        /**
         * Transmit Message
         */
        x = x + "670011";


    }
    //%blockId="iotloranode_humidityValue" block="Add Humidity Value: $message to %x=variables_get(text_payloadData) on channel: %id"
    //%advanced=true
    export function humidityValue(message: string, id: channels): void {
        /**
         * Transmit Message
         */


    }
    //%blockId="iotloranode_accelorometerValue" block="Add Accelerometer Value: $message to %x=variables_get(text_payloadData) on channel: %id"
    export function accelorometerValue(message: string, x: string, id: channels): void {
        /**
         * Transmit Message
         */


    }
    //%blockId="iotloranode_lightValue" block="Add light Value: $lightVal on channel: %id"
    export function lightValue(lightVal: number, id: channels): void {
        /**
         * Transmit Message
         */



    }
    //%blockId="iotloranode_transmitMessage" block="Transmit LoRa Data"
    export function loraTransmitPayload(): void {
        /**
         * Transmit Message
         */

        serial.writeString("at+send=0,1," + payload+"\r\n");
        basic.showString(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
        basic.showString(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
        payload = "";
    }
    

}