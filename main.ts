
//% weight=10 color=#8bc34a icon="\uf519"
namespace iotloranode {
    /**
     * First we need to configure the serial port to use the pins and reset the radio
     */
    serial.redirect(SerialPin.P14, SerialPin.P15, 115200);
    pins.digitalWritePin(DigitalPin.P16, 1);
    basic.pause(300);
    pins.digitalWritePin(DigitalPin.P16, 0);

    //%blockId="iotloranode_initialiseRadi" block="Initialise LoRa Radio: Device Address %deviceaddress|Network Session Key %netswk|App Session Key %appswk|"
    //% blockGap=8 
    export function initialiseRadio(devaddress: string, netswk: string, appswk: string): void {
        /**
         * For this we are only going to use ABP for now
         */
        basic.pause(100);

    }
    //%blockId="iotloranode_digitalValue" block="Add Digital Value: $message"
    export function digitalValue(message: string): void {
        /**
         * Transmit Message
         */


    }
    //%blockId="iotloranode_analogueValue" block="Add Analogue Value: %value"
    //% x.min=0 x.max=254
    export function analogueValue(value: number): void {
        /**
         * Transmit Message
         */


    }

    //%blockId="iotloranode_tempertureValue" block="Add Temperature Value: $message"
    export function tempertureValue(message: string): void {
        /**
         * Transmit Message
         */


    }
    //%blockId="iotloranode_humidityValue" block="Add Humidity Value: $message"
    export function humidityValue(message: string): void {
        /**
         * Transmit Message
         */


    }
    //%blockId="iotloranode_accelorometerValue" block="Add Accelerometer Value: $message"
    export function accelorometerValue(message: string): void {
        /**
         * Transmit Message
         */


    }
    //%blockId="iotloranode_transmitMessage" block="Transmit via LoRa: $message"
    export function loraTransmitPayload(message: string): void {
        /**
         * Transmit Message
         */
    }

}