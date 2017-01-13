'use strict';

module.exports = {
  backendApiSecret: process.env.AFROSTREAM_API_SECRET,
  backendApiKey: process.env.AFROSTREAM_API_KEY,

  /*
   * exemples de features
   *
   * si on request: api.afrostream.tv/(...)
   * req.features.isEnabled('foo') va retourner true
   * req.features.getVariant('foo') va retourner "on"
   *
   * req.features.isEnabled('bar') va retourner true
   * req.features.getVariant('bar') va retourner "bar"
   *
   * req.features.isEnabled('nope') va retourner false
   * req.features.getVariant('nope') va retourner "off"
   *
   * req.features.isEnabled('rampedUp') va retourner true 1 fois sur 3
   * req.features.getVariant('rampedUp') va retourner "on" tout le temps
   *
   * req.features.isEnabled('ipList') va retourner true si la requête vient d'une ip dans la liste
   * req.features.getVariant('ipList') va retourner "on" tout le temps
   *
   * si on request: api.afrostream.tv/(...)?foo=off&bar=on&nope=on&rampedUp=on&ipList=whatever
   * req.features.isEnabled('foo') va retourner false
   * req.features.getVariant('foo') va retourner "off"
   * req.features.isEnabled('bar') va retourner true
   * req.features.getVariant('bar') va retourner "on"
   * req.features.isEnabled('nope') va retourner true
   * req.features.getVariant('nope') va retourner "on"
   * req.features.isEnabled('rampedUp') va retourner true tout le temps
   * req.features.getVariant('rampedUp') va retourner "on"
   * req.features.isEnabled('ipList') va retourner true  peu importel 'ip qui appelle'
   * req.features.getVariant('ipList') va retourner "whatever"
   */
  features: {
    foo: 'on',
    bar: 'bar',
    nope: 'off',
    rampedUp: { variant: 'on', rampedUp: 0.33}
    ipList: { variant: 'on', ipList: [ /82\.228\.194\.\d+/ ]}
  }
};
