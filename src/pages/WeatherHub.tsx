import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Cloud, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  ThermometerSun,
  MapPin,
  Activity
} from "lucide-react";

const WeatherHub = () => {
  const [city, setCity] = useState("");

  // Helper function to get AQI color
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "bg-green-500";
    if (aqi <= 100) return "bg-yellow-500";
    if (aqi <= 200) return "bg-orange-500";
    if (aqi <= 300) return "bg-red-500";
    if (aqi <= 400) return "bg-purple-500";
    return "bg-rose-900";
  };

  const getAQILabel = (aqi: number) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Satisfactory";
    if (aqi <= 200) return "Moderate";
    if (aqi <= 300) return "Poor";
    if (aqi <= 400) return "Very Poor";
    return "Severe";
  };

  const pollutants = [
    { name: "PM2.5", formula: "Particulate Matter", value: "--", unit: "μg/m³", level: "moderate" },
    { name: "PM10", formula: "Particulate Matter", value: "--", unit: "μg/m³", level: "moderate" },
    { name: "CO", formula: "Carbon Monoxide", value: "--", unit: "ppb", level: "good" },
    { name: "SO₂", formula: "Sulfur Dioxide", value: "--", unit: "ppb", level: "good" },
    { name: "NO₂", formula: "Nitrogen Dioxide", value: "--", unit: "ppb", level: "good" },
    { name: "O₃", formula: "Ozone", value: "--", unit: "ppb", level: "good" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <MapPin className="w-4 h-4" />
            <span>Dashboard</span>
            <span>›</span>
            <span>India</span>
            <span>›</span>
            <span className="text-foreground font-medium">Select Location</span>
          </div>

          {/* Search Bar */}
          <Card className="p-6 mb-8">
            <div className="flex gap-4">
              <Input 
                placeholder="Search any Location, City, State or Country" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1"
              />
              <Button>Search</Button>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="aqi" className="mb-8">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="aqi" className="gap-2">
                <Activity className="w-4 h-4" />
                AQI
              </TabsTrigger>
              <TabsTrigger value="weather" className="gap-2">
                <Cloud className="w-4 h-4" />
                Weather
              </TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="pm25">PM2.5</TabsTrigger>
              <TabsTrigger value="pm10">PM10</TabsTrigger>
              <TabsTrigger value="co">CO</TabsTrigger>
              <TabsTrigger value="so2">SO2</TabsTrigger>
              <TabsTrigger value="no2">NO2</TabsTrigger>
              <TabsTrigger value="o3">O3</TabsTrigger>
            </TabsList>

            <TabsContent value="aqi" className="space-y-8 mt-8">
              {/* Live AQI Display */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-4 left-4">
                  <Badge variant="destructive" className="gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    LIVE
                  </Badge>
                </div>
                
                <div className="p-8 bg-gradient-to-br from-orange-100/50 to-orange-200/30 dark:from-orange-950/20 dark:to-orange-900/10">
                  <h2 className="text-2xl font-bold mb-2">Air Quality Index (AQI) | Air Pollution</h2>
                  <p className="text-muted-foreground mb-1">Real-time PM2.5, PM10 air pollution level</p>
                  <p className="text-sm text-muted-foreground">Last Updated: Select a location to view data</p>

                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    {/* AQI Score */}
                    <div>
                      <div className="flex items-baseline gap-4 mb-4">
                        <div className="text-7xl font-bold text-orange-600">--</div>
                        <div className="text-3xl font-semibold text-orange-600">
                          Select Location
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium w-24">PM10:</span>
                          <span className="text-2xl font-bold">-- μg/m³</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium w-24">PM2.5:</span>
                          <span className="text-2xl font-bold">-- μg/m³</span>
                        </div>
                      </div>

                      {/* AQI Scale */}
                      <div className="mt-6">
                        <div className="h-4 rounded-full overflow-hidden flex">
                          <div className="flex-1 bg-green-500" title="Good: 0-50" />
                          <div className="flex-1 bg-yellow-500" title="Satisfactory: 51-100" />
                          <div className="flex-1 bg-orange-500" title="Moderate: 101-200" />
                          <div className="flex-1 bg-red-500" title="Poor: 201-300" />
                          <div className="flex-1 bg-purple-500" title="Very Poor: 301-400" />
                          <div className="flex-1 bg-rose-900" title="Severe: 401-500" />
                        </div>
                        <div className="flex justify-between text-xs mt-2">
                          <span>0</span>
                          <span>50</span>
                          <span>100</span>
                          <span>150</span>
                          <span>200</span>
                          <span>300</span>
                          <span>500+</span>
                        </div>
                        <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                          <span>Good</span>
                          <span>Moderate</span>
                          <span>Poor</span>
                          <span>Severe</span>
                        </div>
                      </div>
                    </div>

                    {/* Weather Info */}
                    <div className="space-y-6">
                      <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <Cloud className="w-12 h-12" />
                          <div>
                            <div className="text-3xl font-bold">--°C</div>
                            <div className="text-sm text-muted-foreground">Weather condition</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                              <Droplets className="w-4 h-4" />
                              <span>Humidity</span>
                            </div>
                            <div className="text-xl font-bold">--%</div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                              <Wind className="w-4 h-4" />
                              <span>Wind Speed</span>
                            </div>
                            <div className="text-xl font-bold">-- km/h</div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                              <ThermometerSun className="w-4 h-4" />
                              <span>UV Index</span>
                            </div>
                            <div className="text-xl font-bold">--</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Major Air Pollutants */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Major Air Pollutants</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pollutants.map((pollutant) => (
                    <Card key={pollutant.name} className="p-6 border-l-4 border-l-orange-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Activity className="w-5 h-5" />
                            <h3 className="font-bold text-lg">{pollutant.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">
                            ({pollutant.formula})
                          </p>
                          <div className="text-3xl font-bold">
                            {pollutant.value} <span className="text-base font-normal text-muted-foreground">{pollutant.unit}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Historical Graph Placeholder */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">AQI Graph</h3>
                    <p className="text-muted-foreground">Historical Air Quality Data</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">24 Hours</Button>
                    <Button variant="outline" size="sm">7 Days</Button>
                    <Button variant="outline" size="sm">30 Days</Button>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                  Select a location to view historical AQI data
                </div>
              </Card>

              {/* Annual Trends Placeholder */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">Annual AQI Trends</h3>
                <div className="h-96 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                  Annual trend visualization will appear here
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="weather" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <ThermometerSun className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">Temperature</h3>
                  </div>
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold">--°C</div>
                    <div className="text-muted-foreground mt-2">Feels like --°C</div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Droplets className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">Humidity</h3>
                  </div>
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold">--%</div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Wind className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">Wind Speed</h3>
                  </div>
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold">-- km/h</div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">Visibility</h3>
                  </div>
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold">-- km</div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Gauge className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">Pressure</h3>
                  </div>
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold">-- mb</div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Cloud className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold">Cloud Cover</h3>
                  </div>
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold">--%</div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WeatherHub;
