import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { DockIcon } from "lucide-react";
import { YoutubeIcons } from "@/icons/YoutubeIcons";
import { GridBackground } from "@/lightwind/Components/dotAndGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { BACKEND_URL } from "@/config";

interface BrainData {
  username: string; 
  content: Array<{
    title: string;
    content: string;
    type?: string;
    link?: string;
  }>;
}

export default function UserDashboard() {
  const { shareLink } = useParams();
  
  const [data, setData] = useState(null as BrainData | null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shareLink) return;

    const fetchSharedContent = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
        if (!res.ok) throw new Error("Invalid or expired share link");

        const json = await res.json();
        console.log(json);
        
        setData(json);
      } catch (error) {
        console.error(error||"Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [shareLink]);

  return (
    <GridBackground>
        <div className="p-6 text-white min-h-screen z-50">
      <h1 className="text-3xl font-bold mb-2 z-10">{data?.username}'s Note</h1>
      <p className="text-gray-400 mb-6 z-10">A collection of {data?.content.length} item(s)</p>

      <div className="flex flex-wrap ">

        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[30vh] w-[30vw] rounded-xl bg-muted mx-2 my-2 " />
          ))
          ) : (
            data?.content?.map((item, idx) => (
              <Card
                key={idx}
                className="bg-secondary text-secondary-foreground border-accent md:w-[30vw] w-full mx-2 my-2 hover:-translate-y-2 transition-transform duration-300 z-0"
              >
                <CardHeader>
                  <CardTitle className="flex gap-2">
                    {item.type === 'document' ? <DockIcon /> : <YoutubeIcons />} {item.title}
                  </CardTitle>

                  <CardDescription className="border border-accent">
                    {item.content}
                  </CardDescription>

                  {item.type === 'twitter' && (
                    <CardDescription>
                      <a
                        className="text-blue-600 border border-accent bg-primary-foreground rounded-lg p-2"
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.link}
                      </a>
                    </CardDescription>
                  )}

                  {item.type === 'youtube' && (
                    <CardDescription>
                      <iframe
                        className="w-full h-40 rounded-md"
                        src={item.link?.replace("watch", "embed").replace("?v=", "/")}
                        title="Embedded video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            ))
        )}

      </div>
    </div>
    </GridBackground>
  );
}
