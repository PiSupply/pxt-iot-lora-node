/*
* pxt-iot-lora node, Micro:Bit library for IoTLoRaNode
* Copyright (C) 2018-2020  Pi Supply

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
* Last Updated 2022-03-10 0931
*/

/*
HK

DOCS: https://github.com/RAKWireless/RAK811_LoRaNode/blob/master/doc/Software/RAK811%C2%A0Lora%C2%A0AT%C2%A0Command%C2%A0V1.4.pdf

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
    Nine = 9,
    //% block="Ten"
    Ten = 10,
    //% block="Eleven"
    Eleven = 11,
    //% block="Twelve"
    Twelve = 12,
    //% block="Thirteen"
    Thirteen = 13,
    //% block="Fourteen"
    Fourteen = 14,
    //% block="fifteen"
    Fifteen = 15,
    //% block="Sixteen"
    Sixteen = 16,
    //% block="Seventeen"
    Seventeen = 17,
    //% block="Eighteen"
    Eighteen = 18,
    //% block="Nineteen"
    Nineteen = 19,
    //% block="Twenty"
    Twenty = 20

}
enum SpreadingFactors {
    //% block="Six"
    Six = 6,
    //% block="Seven"
    Seven = 7,
    //% block="Eight"
    Eight = 8,
    //% block="Nine"
    Nine = 9,
    //% block="Ten"
    Ten = 10,
    //% block="Eleven"
    Eleven = 11,
    //% block="Twelve"
    Twelve = 12

}

enum CodingRates {
    //% block="4/5"
    FourFive = 1,
    //% block="4/6"
    FourSix = 2,
    //% block="4/7"
    FourSeven = 3,
    //% block="4/8"
    FourEight = 4

}

enum region {
    //% block="EU868"
    EU868 = 0,
    //% block="US915"
    US915 = 1,
    //% block="AU915"
    AU915 = 2,
    //% block="AS92X"
    AS92X = 3
}

enum euFreqs {
    //% block="868.1"
    EU8681 = 1,
    //% block="868.3"
    EU8683 = 2,
    //% block="868.5"
    EU8685 = 4,
    //% block="ALL"
    EUALL = 7

}

enum GPIOPins {
    //% block="PA15"
    PA15 = 14,
    //% block="PB3"
    PB3 = 15,
    //% block="PB5"
    PB5 = 16,
    //% block="PB8"
    PB8 = 18,
    //% block="PB9"
    PB9 = 19,
    //% block="PA2"
    PA2 = 20

}

enum ADCPins {
    //% block="PA2"
    PA2 = 20

}


//% weight=10 color=#8bc34a icon="\uf1eb"


namespace IotLoRaNode {
    serial.redirect(SerialPin.P14, SerialPin.P15, BaudRate.BaudRate115200);
    let payload = ""
    let regionsList: string[] = ["EU868", "US915", "AU915", "AS920"]

    //%blockId="IotLoRaNode_InitialiseRadioABP" block="Initialise LoRa Radio via ABP:|Device Address %deviceaddress|Network Session Key %netswk|App Session Key %appswk|SF %datarate"
    //% blockGap=8
    export function InitialiseRadio(devaddress: string, netswk: string, appswk: string, datarate: SpreadingFactors): void {

        /**
        * First we need to  reset the radio
        * it will respond with 3 lines:
        *
        * 1 Welcome to RAK811
        * 2
        * 3 Selected LoraWAN 1.0.2 Region: EU868
        *
        */
        basic.clearScreen()
        led.plot(2, 4)
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P16, 0)
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))

        /**
         * For this we are only going to use ABP & LoRa WAN Modes for now
         * it will respond with 5 lines:
         *
         * 1
         * 2 
         * 3 Selected LoraWAN 1.0.2 Region: EU868
         * 4 
         * 5 OK
         * 
         */
        led.plot(2, 3)
        basic.pause(75)
        //Set to use LoRaWAN Mode
        serial.writeString("at+mode=0\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))

        led.plot(2, 2)
        basic.pause(75)
        //Set Device Address
        serial.writeString("at+set_config=dev_addr:" + devaddress + "\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))

        led.plot(2, 1)
        basic.pause(75)
        //Set the network session key
        serial.writeString("at+set_config=nwks_key:" + netswk + "\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))

        led.plot(1, 0)
        basic.pause(75)
        //Set the application session key
        serial.writeString("at+set_config=apps_key:" + appswk + "\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))

        led.plot(3, 0)
        basic.pause(75)
        //Set the data rate
        serial.writeString("at+set_config=dr:" + datarate + "\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))


        led.plot(2, 0)
        basic.pause(75)
        //"Join" the LoRaWAN Network in ABP Mode
        serial.writeString("at+join=abp\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))

        //Display on the screen that LoRa is ready.
        basic.showString("LoRa Ready")


    }

    //%blockId="IotLoRaNode_InitialiseRadioOTAA" block="Initialise LoRa Radio via OTAA:|Device Eui %deveui|App EUI %appeui|App Key %appkey" advanced=true
    //% blockGap=8
    export function InitialiseRadioOTAA(deveui: string, appeui: string, appkey: string): void {
        /**
        * First we need to  reset the radio
        * it will respond with 4 lines:
        *
        * 1 Welcome to RAK811
        * 2
        * 3 Selected LoraWAN 1.0.2 Region: EU868
        * 4
        *
        */

        basic.clearScreen()
        led.plot(2, 4)
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P16, 0)
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))

        /**
         * For this we are only going to use OTAA & LoRa WAN Modes for now
         * it will respond with 5 lines:
         *
         * 1
         * 2
         * 3 Selected LoraWAN 1.0.2 Region: EU868
         * 4
         * 5 OK
         *
         */

        led.plot(2, 3)
        basic.pause(75)
        //Set to use LoRaWAN Mode
        serial.writeString("at+mode=0\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))

        led.plot(2, 2)
        basic.pause(75)
        //Set Device Address
        serial.writeString("at+set_config=dev_eui:" + deveui + "\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))

        led.plot(2, 1)
        basic.pause(75)
        //Set the network session key
        serial.writeString("at+set_config=app_eui:" + appeui + "\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))

        led.plot(1, 0)
        basic.pause(75)
        //Set the application session key
        serial.writeString("at+set_config=app_key:" + appkey + "\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))

        led.plot(3, 0)
        basic.pause(75)
        //Set the data rate
        serial.writeString("at+set_config=dr:0\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))


        led.plot(2, 0)
        basic.pause(75)
        //"Join" the LoRaWAN Network in ABP Mode
        serial.writeString("at+join=otaa\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))

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

    //%blockId="IotLoRaNode_temperatureValue" block="Add Temperature Value: %temperatureVal to channel: %chanNum"
    export function TemperatureValue(temperatureVal: number, chanNum: Channels): void {
        /**
         * Add temperature value
         */
        let bufr = pins.createBuffer(2);
        bufr.setNumber(NumberFormat.Int16BE, 0, (temperatureVal * 10))

        payload = payload + "0" + chanNum + "67" + bufr.toHex();


    }

    //%blockId="IotLoRaNode_barometerValue" block="Add Barometer Value: %barometerVal to channel: %chanNum"
    export function BarometerValue(barometerVal: number, chanNum: Channels): void {
        /**
         * Add barometer value
         */
        let bufr = pins.createBuffer(2);
        bufr.setNumber(NumberFormat.Int16BE, 0, (barometerVal * 10))

        payload = payload + "0" + chanNum + "73" + bufr.toHex();


    }

    //%blockId="IotLoRaNode_PresenceSensor"
    //%block="Add Presence Sensor: %value on channel: %chanNum"
    export function PresenceSensor(value: boolean, chanNum: Channels): void {
        /**
         * Add presence value
         */
        let intVal = value ? 1 : 0;
        payload = payload + "0" + chanNum + "660" + intVal;

    }

    //%blockId="IotLoRaNode_HumidityValue" block="Add Humidity Value: %humidityVal to channel: %chanNum"
    //%advanced=true
    export function HumidityValue(humidityVal: number, chanNum: Channels): void {
        /**
         * Add humidity value
         */
        let bufr = pins.createBuffer(1);
        bufr.setNumber(NumberFormat.UInt8BE, 0, (humidityVal * 2))

        payload = payload + "0" + chanNum + "68" + bufr.toHex();


    }

    //%blockId="IotLoRaNode_AccelorometerValue" block="Add Accelerometer Value - X: %accelValX , Y: %accelValY , Z: %accelValZ ,  to channel: %hanNum"
    export function AccelorometerValue(accelValX: number, accelValY: number, accelValZ: number, chanNum: Channels): void {
        /**
         * Add accelorometer
         */
        let bufr = pins.createBuffer(6);
        bufr.setNumber(NumberFormat.Int16BE, 0, (accelValX * 100))
        bufr.setNumber(NumberFormat.Int16BE, 2, (accelValY * 100))
        bufr.setNumber(NumberFormat.Int16BE, 4, (accelValZ * 100))

        payload = payload + "0" + chanNum + "71" + bufr.toHex();

    }


    //%blockId="IotLoRaNode_LightValue" block="Add light Value: %lightVal on channel: %chanNum"
    export function LightValue(lightVal: number, chanNum: Channels): void {
        /**
         * Add light value
         */
        let bufr = pins.createBuffer(2);
        bufr.setNumber(NumberFormat.Int16BE, 0, (lightVal))

        payload = payload + "0" + chanNum + "65" + bufr.toHex();

    }



    //%blockId="IotLoRaNode_GPS" block="Add GPS Value - Latitude: %latitude Longitude %longitude Altitude %altitude on channel: %chanNum"
    //% blockGap=8
    export function GPS(latitude: number, longitude: number, altitude: number, chanNum: Channels): void {
        /**
         * Add GPS value
         */
        let latBuf = pins.createBuffer(4);
        latBuf.setNumber(NumberFormat.Int32BE, 0, longitude * 10000)
        let latBuf2 = latBuf.slice(1, 4);

        let lonBuf = pins.createBuffer(4);
        lonBuf.setNumber(NumberFormat.Int32BE, 0, latitude * 10000)
        let lonBuf2 = lonBuf.slice(1, 4);
        let altBuf = pins.createBuffer(4);
        altBuf.setNumber(NumberFormat.Int32BE, 0, altitude * 100)
        let altBuf2 = altBuf.slice(1, 4);
        payload = "" + payload + "0" + chanNum + "88" + lonBuf2.toHex() + latBuf2.toHex() + altBuf2.toHex()




    }

    //%blockId="IotLoRaNode_TransmitMessage" block="Transmit LoRa Data"
    export function loraTransmitPayload(): void {
        /**
         * Transmit Message
         */

        serial.writeString("at+send=0,1," + payload + "\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        basic.pause(100)
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        basic.pause(100)
        payload = ""
    }
    //%blockId="IotLoRaNode_SetRegion" block="Set LoRa Region: %regionVal"
    export function SetRegion(regionVal: region): void {
        /**
         * SetRegion
         */

        basic.showIcon(IconNames.SmallDiamond)
        /**
        * First we need to  reset the radio
        * it will respond with 3 lines:
        *
        * 1 Welcome to RAK811
        * 2
        * 3 Selected LoraWAN 1.0.2 Region: EU868
        *
        */

        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P16, 0)
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        basic.pause(75)


        serial.writeString("at+band=" + regionsList[regionVal] + "\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        basic.showIcon(IconNames.Diamond)

        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P16, 0)
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
        basic.showIcon(IconNames.Yes)
        //basic.showNumber(1)
        if (regionsList[regionVal] == "US915") {
            serial.writeString("at+set_config=ch_mask:0,FF00\r\n");
            serial.readLine()
            basic.pause(75)
            serial.writeString("at+set_config=ch_mask:1,0000\r\n");
            serial.readLine()
            basic.pause(75)
            serial.writeString("at+set_config=ch_mask:2,0000\r\n");
            serial.readLine()
            basic.pause(75)
            serial.writeString("at+set_config=ch_mask:3,0000\r\n");
            serial.readLine()
            basic.pause(75)
            serial.writeString("at+set_config=ch_mask:4,0000\r\n");
            serial.readLine()
            basic.pause(75)
        }

        else if (regionsList[regionVal] == "AU915") {
            serial.writeString("at+set_config=ch_mask:0,FF00\r\n");
            serial.readLine()
            basic.pause(75)
            serial.writeString("at+set_config=ch_mask:1,0000\r\n");
            serial.readLine()
            basic.pause(75)
            serial.writeString("at+set_config=ch_mask:2,0000\r\n");
            serial.readLine()
            basic.pause(75)
            serial.writeString("at+set_config=ch_mask:3,0000\r\n");
            serial.readLine()
            basic.pause(75)
            serial.writeString("at+set_config=ch_mask:4,0000\r\n");
            serial.readLine()
            basic.pause(75)
        }
        //basic.showNumber(2)
    }

    //%blockId="IotLoRaNode_SleepMode" block="Sleep Mode" advanced=true
    export function loraSleepMode(): void {
        /**
         * Sleep Mode
         */

        serial.writeString("at+sleep\r\n");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
    }
    //%blockId="IotLoRaNode_WakeUp" block="Wake from Sleep" advanced=true 
    export function loraWakeUp(): void {
        /**
         * Sleep Mode
         */

        //serial.writeString("");
        serial.readUntil(serial.delimiters(Delimiters.NewLine))
    }

    //%blockId="IotLoRaNode_GPIOWrite" block="Write GPIO" block="Write GPIO Pin Digital:|Pin Number %pinNum|State %state"
    export function loraGPIOWrite(pinNum: GPIOPins, state: boolean): void {
        /**
         * GPIO Write
         */

        let gpioVal = state ? 1 : 0;
        serial.writeString("at+gpio=" + pinNum + "," + gpioVal + "\r\n");
        basic.showString(serial.readUntil(serial.delimiters(Delimiters.NewLine)))
    }

    //%blockId="IotLoRaNode_GPIORead" block="Read GPIO Digital" block="Read GPIO Pin Digital:|Pin Number %pinNum"
    export function loraGPIORead(pinNum: GPIOPins): boolean {
        /**
         * GPIO Read
         */
        let boolVal = false;
        serial.writeString("at+gpio=" + pinNum + "\r\n");
        let value = parseInt(serial.readUntil(serial.delimiters(Delimiters.NewLine)).charAt(2))
        let gpioVal = value ? true : false;
        return gpioVal;
    }

    //%blockId="IotLoRaNode_GPIOAdc" block="Read GPIO ADC" advanced=true block="Read GPIO Pin Analogue:|Pin Number %pinNum"
    export function loraGPIOAdc(pinNum: ADCPins): number {
        /**
         * GPIO ADC
         */

        serial.writeString("at+rd_adc=" + pinNum + "\r\n");

        let value = serial.readString()
        let value2 = value.substr(2, 4)
        //basic.showString(value2)
        //basic.showNumber(parseInt(value2))


        //basic.showIcon(IconNames.Yes)
        //basic.pause(100)
        //serial.redirectToUSB()
        //serial.writeString(value)
        //serial.redirect(SerialPin.P14, SerialPin.P15, BaudRate.BaudRate115200);

        return parseInt(value2);
    }

    //%blockId="IotLoRaNode_InitialiseRadioP2P" block="Initialise LoRa Radio for P2P" advanced=true
    //% blockGap=8
    export function InitialiseRadioP2P(): void {
        /**
        * First we need to configure the serial port to use the pins and reset the radio
        */
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(300)
        pins.digitalWritePin(DigitalPin.P16, 0)
        serial.readLine()
        serial.readLine()
        serial.readLine()

        //basic.showNumber(0)

        /**
         * For this we are only going to use ABP & LoRa WAN Modes for now
         */

        //basic.showNumber(1)
        basic.pause(75)
        //Set to use LoRaWAN Mode
        serial.writeString("at+mode=1\r\n");
        serial.readLine()
        //Display on the screen that LoRa is ready.
        basic.showString("P2P Ready")


    }

    //%blockId="IotLoRaNode_rfconfig" advanced=true block="Configure LoRa P2P:|Frequency %frequency|Spreading Factor %spreadingfactor|Bandwidth %bandwidth|Coding Rate %codingRate|Preamlen %preamlen|Transmission Pwr %power"
    //% blockGap=8
    export function rfconfig(frequency: number, spreadingfactor: SpreadingFactors, bandwidth: number, codingRate: CodingRates, preamlen: number, power: number): void {

        basic.pause(75)
        //Set to use LoRaWAN Mode
        serial.writeString("at+rf_config=" + frequency + "," + spreadingfactor + "," + bandwidth + "," + codingRate + "," + preamlen + "," + power + "\r\n");
        serial.readLine()

    }

    //%blockId="IotLoRaNode_txc" advanced=true block="LoRa P2P Continous transmit:|Count %count|Interval %interval|Data %data"
    //% blockGap=8
    export function txc(count: number, interval: number, data: string): void {

        basic.pause(75)
        //Set to use LoRaWAN Mode
        serial.writeString("at+txc=" + count + "," + interval + "," + data + "\r\n");
        serial.readLine()

    }

    //%blockId="IotLoRaNode_rxc" advanced=true block="LoRa P2P Continous Receive"
    export function rxc(): void {

        basic.pause(75)
        //Set to use LoRaWAN Mode
        serial.writeString("at+rxc=1\r\n");
        serial.readLine()

    }

    //%blockId="IotLoRaNode_txstop" advanced=true block="Stop P2P TX"
    //% blockGap=8
    export function txstop(): void {

        basic.pause(75)
        //Set to use LoRaWAN Mode
        serial.writeString("at+tx_stop\r\n");
        serial.readLine()

    }

    //%blockId="IotLoRaNode_rxstop" advanced=true block="Stop P2P RX"
    //% blockGap=8
    export function rxstop(): void {

        basic.pause(75)
        //Set to use LoRaWAN Mode
        serial.writeString("at+rx_stop\r\n");
        serial.readLine()

    }

    //%blockId="IotLoRaNode_spreadingFactor" advanced=true block="Set SF: %spreadingFactor"
    //% blockGap=8
    export function IotLoRaNode_spreadingFactor(spreadingfactor: SpreadingFactors): void {

        basic.pause(75)
        //Set to use LoRaWAN Mode
        serial.writeString("at+set_config=dr:" + spreadingfactor + "\r\n");
        serial.readLine()

    }

    //%blockId="IotLoRaNode_chmask_eu" advanced=true block="EU Set Freq: %euFreq"
    //% blockGap=8
    export function IotLoRaNode_chmask_eu(eufreq: euFreqs): void {

        basic.pause(75)
        //Set to use single channel gateway

        serial.writeString("at+set_config=ch_mask:0,000" + eufreq.toString() + "\r\n");
        serial.readLine()

    }

    //End2
}
