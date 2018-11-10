# pxt-iot-lora-node

[![Build Status](https://travis-ci.org/PiSupply/pxt-iot-lora-node.svg?branch=master)](https://travis-ci.org/PiSupply/pxt-iot-lora-node)

## Blocks

### Initialise LoRa Radio
This block initialises the LoRa Radio module ready for use, it sets up the library and sends the commands to the RAK811 to configure it for use with the LoRaWAN Network.

Currently the Makecode library only supports ABP Mode.

```sig
IoTLoRaNode.initialiseRadio(
"Dev Address",
"NWSK",
"AppKey",
spreadingFactors.Seven
)
```
You must fill out the Device Address, NWSK / Network Session Key & Application Session Key.you can find this from your LoRaWAN Provider. (Such as The Things Network).

### Data Adders
These blocks add Data to the payload, the payload is a string variable which gets the correct byte values for the specified sensor with these blocks.
Each block can specifiy the "channel" that it is on, this is so when the decoder decodes it the sensor is on the same "channel" each time.
Each sensor should be on its own unique channel between one to nine.
#### Add Digital Value
This block can add a digital value of either ```true``` or ```false```.

```sig
IoTLoRaNode.digitalValue(false, channels.One)
```
TTN will decode this value as a digital value of 1 or 0.

#### Add Analogue Value
This block can add an analogue value from `0` to `254`.

```sig
IoTLoRaNode.analogueValue(0, channels.One)
```
TTN Will decode this value as an analogue in with the decoded value displayed.

#### Add Temperature Value
This block will add an analogue value similar to the analogue value method. However once decoded will display in degrees C.

```sig
IoTLoRaNode.tempertureValue(0, channels.One)
```
TTN will decode this as a Degrees C value in the decoder.

#### Add Light Value
Similar to the Analogue & Temperature Values. This formats it as a light level value.
```sig
IoTLoRaNode.lightValue(0, channels.One)
```
TTN will decode this as a light level value in the decoder.

### Transmit LoRa Data
This block is then used to transmit the payload, when run it will transmit the entire payload in the buffer.

```sig
IoTLoRaNode.loraTransmitPayload()
```

## LoRaWAN Providers

This package is designed to be used currently in LoRaWAN Mode only which means that your node has to be within range of a LoRaWAN Provider and for you to be signed up to that LoRaWAN Provider.

We officially support these two providers and can provide support for them:
- The Things Network
- LoRIOT

## License
This library is released under the GNU GPL V3 License, you can view the full license in the LICENSE file.

## Translations
We aim to with the help of the community translate this package to a variety of languages.

Languages in bold have been translated and then checked by at least one person who speaks that language.
Languages not in bold have been translated by us using translation software but requires checking.
Languages in Italics are to be translated.
- French
- *Dutch*
- *Italian*
- *German*
- *Spanish*

## Meta

Tutorials: [Maker Zone Micro:bit Page](http://learn.pi-supply.com/make)

Questions? [Email us](mailto:sales@pi-supply.com) or ask in our [Discord Server](https://pisupp.ly/chat)

Keywords: LoRa, LoRaWAN, The Things Network, Pi Supply

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
