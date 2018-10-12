

enum channels {
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9

}
enum spreadingFactors {
    Seven = 5,
    Eight = 4,
    Nine = 3,
    Ten = 2,
    Eleven = 1,
    Twelve = 0

}


//% weight=10 color=#8bc34a icon="\uf1eb"

namespace iotloranode {




    serial.redirect(SerialPin.P14, SerialPin.P15, BaudRate.BaudRate115200);
    let payload = ""

    //%blockId="iotloranode_initialiseRadio" block="Initialise LoRa Radio:|Device Address %deviceaddress|Network Session Key %netswk|App Session Key %appswk|SF %datarate"
    //% blockGap=8 
    export function initialiseRadio(devaddress: string, netswk: string, appswk: string, datarate: spreadingFactors): void {
        /**
     * First we need to configure the serial port to use the pins and reset the radio
     */

        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P16, 0)
        serial.readLine()
        //basic.showNumber(0)

        /**
         * For this we are only going to use ABP & LoRa WAN Modes for now
         */


        serial.writeString("at+mode=0\r\n");
        serial.readLine()

        serial.writeString("at+set_config=dev_addr:" + devaddress + "\r\n");
        serial.readLine()

        serial.writeString("at+set_config=nwks_key:" + netswk + "\r\n");
        serial.readLine()

        serial.writeString("at+set_config=apps_key:" + appswk + "\r\n");
        serial.readLine()

        serial.writeString("at+set_config=dr:" + datarate + "\r\n");
        serial.readLine()

        serial.writeString("at+join=abp\r\n");
        serial.readLine()

        basic.showString("LoRa Ready")


    }
    //%blockId="iotloranode_digitalValue"
    //%block="Add Digital Value: %value on channel: %chanNum"
    export function digitalValue(value: boolean, chanNum: channels): void {
        /**
         * Add digital value
         */
        let intVal = value ? 1 : 0;
        payload = payload + "0" + chanNum + "000" + intVal;

    }
    //%blockId="iotloranode_analogueValue" block="Add Analogue Value: %value on channel: %chanNum"
    //% value.min=0 value.max=254
    export function analogueValue(value: number, chanNum: channels): void {
        /**
         * Add analogue value
         */
        let bufr = pins.createBuffer(2);
        bufr.setNumber(NumberFormat.Int16BE, 0, (value * 100))

        payload = payload + "0" + chanNum + "02" + bufr.toHex();


    }

    //%blockId="iotloranode_tempertureValue" block="Add Temperature Value: $temperatureVal to channel: %id"
    export function tempertureValue(temperatureVal: number, chanNum: channels): void {
        /**
         * Add temperature value
         */
        let bufr = pins.createBuffer(2);
        bufr.setNumber(NumberFormat.Int16BE, 0, (temperatureVal * 10))

        payload = payload + "0" + chanNum + "67" + bufr.toHex();


    }
    //%blockId="iotloranode_humidityValue" block="Add Humidity Value: $humidityVal to channel: %id"
    //%advanced=true
    export function humidityValue(humidityVal: number, chanNum: channels): void {
        /**
         * Add humidity value
         */
        let bufr = pins.createBuffer(2);
        bufr.setNumber(NumberFormat.Int16BE, 0, (humidityVal * 100))

        payload = payload + "0" + chanNum + "68" + bufr.toHex();


    }
    /**
    * //%blockId="iotloranode_accelorometerValue" block="Add Accelerometer Value: $accelVal to channel: %id"
    *export function accelorometerValue(accelVal: number, chanNum: channels): void {
    *    /**
    *     * Add accelorometer
         *
    *    let bufr = pins.createBuffer(2);
    *    bufr.setNumber(NumberFormat.Int16BE, 0, (accelVal * 100))
    *
    *   payload = payload + "0" + chanNum + "02" + bufr.toHex();
    *
    *}
    **/

    //%blockId="iotloranode_lightValue" block="Add light Value: $lightVal on channel: %id"
    export function lightValue(lightVal: number, chanNum: channels): void {
        /**
         * Add light value
         */
        let bufr = pins.createBuffer(2);
        bufr.setNumber(NumberFormat.Int16BE, 0, (lightVal))

        payload = payload + "0" + chanNum + "65" + bufr.toHex();

    }
    //%blockId="iotloranode_transmitMessage" block="Transmit LoRa Data"
    export function loraTransmitPayload(): void {
        /**
         * Transmit Message
         */

        serial.writeString("at+send=0,1," + payload + "\r\n");
        basic.showString(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
        basic.showString(serial.readUntil(serial.delimiters(Delimiters.NewLine)))

    }


}