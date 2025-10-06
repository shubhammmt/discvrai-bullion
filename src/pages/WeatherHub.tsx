import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cloud, Droplets, Wind, Eye, Gauge, ThermometerSun } from "lucide-react";

const WeatherHub = () => {
  const [city, setCity] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Weather & Air Quality</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time weather updates and air quality index across India
            </p>
          </div>

          <Card className="p-6 mb-8">
            <div className="flex gap-4">
              <Input 
                placeholder="Enter city name or coordinates" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1"
              />
              <Button>Search</Button>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Air Quality Index (AQI)</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">PM2.5</div>
                <div className="text-2xl font-bold">-- μg/m³</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">PM10</div>
                <div className="text-2xl font-bold">-- μg/m³</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">CO</div>
                <div className="text-2xl font-bold">-- μg/m³</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">NO₂</div>
                <div className="text-2xl font-bold">-- μg/m³</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">O₃</div>
                <div className="text-2xl font-bold">-- μg/m³</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">SO₂</div>
                <div className="text-2xl font-bold">-- μg/m³</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium mb-2">AQI Category</div>
              <div className="text-lg font-bold">Search for a location to see AQI data</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WeatherHub;
