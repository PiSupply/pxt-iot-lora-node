/*
* pxt-iot-lora node, Micro:Bit library for IoTLoRaNode
* Copyright (C) 2018-2019  Pi Supply

* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
* Last Updated 2019-01-31-3
*/

enum Channels {
    //% block="One"    
    One = 1,
    //% block="Two"
    Two = 2,
    //% block="Three"
    Three = 3,
    //% block="Four"
    Four = 4,
    //% block="Five"
    Five = 5,
    //% block="Six"
    Six = 6,
    //% block="Seven"
    Seven = 7,
    //% block="Eight"
    Eight = 8,
    //% block="Nine"
    Nine = 9

}
enum SpreadingFactors {
    //% block="Seven"
    Seven = 5,
    //% block="Eight"
    Eight = 4,
    //% block="Nine"
    Nine = 3,
    //% block="Ten"
    Ten = 2,
    //% block="Eleven"
    Eleven = 1,
    //% block="Twelve"
    Twelve = 0

}

enum region {
    //% block="EU868"
    EU868 = 1,
    //% block="US915"
    US915 = 2
}



//% weight=10 color=#8bc34a icon="\uf1eb"


namespace IotLoRaNode {
    serial.redirect(SerialPin.P14, SerialPin.P15, BaudRate.BaudRate115200);
    let payload = ""

    //%blockId="IotLoRaNode_InitialiseRadio" block="Initialise LoRa Radio:|Device Address %deviceaddress|Network Session Key %netswk|App Session Key %appswk|SF %datarate"
    //% blockGap=8
    export function InitialiseRadio(devaddress: string, netswk: string, appswk: string, datarate: SpreadingFactors): void {
        /**
        * First we need to configure the serial port to use the pins and reset the radio
        */
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P16, 0)

        basic.showNumber(0)
        basic.showString(serial.readLine())
        basic.showString(serial.readLine())
        basic.showString(serial.readLine())

        /**
         * For this we are only going to use ABP & LoRa WAN Modes for now
         */
        basic.showNumber(1)
        //Set to use LoRaWAN Mode
        serial.writeString("at+mode=0\r\n");
        serial.readLine()
        //Set Device Address
        serial.writeString("at+set_config=dev_addr:" + devaddress + "\r\n");
        serial.readLine()
        //Set the network session key
        serial.writeString("at+set_config=nwks_key:" + netswk + "\r\n");
        serial.readLine()
        //Set the application session key
        serial.writeString("at+set_config=apps_key:" + appswk + "\r\n");
        serial.readLine()
        //Set the data rate
        serial.writeString("at+set_config=dr:" + datarate + "\r\n");
        serial.readLine()
        //"Join" the LoRaWAN Network in ABP Mode
        serial.writeString("at+join=abp\r\n");
        serial.readLine()
        //Display on the screen that LoRa is ready.
        basic.showString("LoRa Ready")


    }
    //%blockId="IotLoRaNode_DigitalValue"
    //%block="Add Digital Value: %value on channel: %chanNum"
    export function DigitalValue(value: boolean, chanNum: Channels): void {
        /**
         * Add digital value
         */
        let intVal = value ? 1 : 0;
        payload = payload + "0" + chanNum + "000" + intVal;

    }
    //%blockId="IotLoRaNode_AnalogueValue" block="Add Analogue Value: %value on channel: %chanNum"
    //% value.min=0 value.max=254
    export function AnalogueValue(value: number, chanNum: Channels): void {
        /**
         * Add analogue value
         */
        let bufr = pins.createBuffer(2);
        bufr.setNumber(NumberFormat.Int16BE, 0, (value * 100))

        payload = payload + "0" + chanNum + "02" + bufr.toHex();


    }

    //%blockId="IotLoRaNode_tempertureValue" block="Add Temperature Value: $temperatureVal to channel: %id"
    export function TempertureValue(temperatureVal: number, chanNum: Channels): void {
        /**
         * Add temperature value
         */
        let bufr = pins.createBuffer(2);
        bufr.setNumber(NumberFormat.Int16BE, 0, (temperatureVal * 10))

        payload = payload + "0" + chanNum + "67" + bufr.toHex();


    }
    //%blockId="IotLoRaNode_HumidityValue" block="Add Humidity Value: $humidityVal to channel: %id"
    //%advanced=true
    export function HumidityValue(humidityVal: number, chanNum: Channels): void {
        /**
         * Add humidity value
         */
        let bufr = pins.createBuffer(2);
        bufr.setNumber(NumberFormat.Int16BE, 0, (humidityVal * 100))

        payload = payload + "0" + chanNum + "68" + bufr.toHex();


    }
    /**
    * //%blockId="IotLoRaNode_AccelorometerValue" block="Add Accelerometer Value: $accelVal to channel: %id"
    *export function AccelorometerValue(accelVal: number, chanNum: channels): void {
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

    //%blockId="IotLoRaNode_LightValue" block="Add light Value: $lightVal on channel: %id"
    export function LightValue(lightVal: number, chanNum: Channels): void {
        /**
         * Add light value
         */
        let bufr = pins.createBuffer(2);
        bufr.setNumber(NumberFormat.Int16BE, 0, (lightVal))

        payload = payload + "0" + chanNum + "65" + bufr.toHex();

    }
    //%blockId="IotLoRaNode_TransmitMessage" block="Transmit LoRa Data"
    export function loraTransmitPayload(): void {
        /**
         * Transmit Message
         */

        serial.writeString("at+send=0,1," + payload + "\r\n");
        basic.showString(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
        basic.showString(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
        payload = ""
    }
    //%blockId="IotLoRaNode_SetRegion" block="Set LoRa Region"
    export function SetRegion(regionVal: region): void {
        /**
         * Transmit Message
         */

        serial.writeString("at+band=," + regionVal + "\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        payload = ""
    }


}
