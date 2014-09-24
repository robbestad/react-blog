<?php
$json = json_decode(file_get_contents(__DIR__ . "/../package.json"), true);
$l_hjem = "Home";
$l_om = "About";
$l_kontakt = "Contact";
$l_kode = "Code";

$requestURL = "http://api.robbestad.com/robbestad";

class Blogger
{


    public function __construct()
    {

    }

    private function callAPI($method, $url, $header, $data = false)
    {
        $curl = curl_init();

        if ($header)
            curl_setopt($curl, CURLOPT_HEADER, $header);

        switch ($method) {
            case "POST":
                curl_setopt($curl, CURLOPT_POST, 1);

                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_PUT, 1);
                break;
            default:
                if ($data)
                    $url = sprintf("%s?%s", $url, http_build_query($data));
        }
        curl_setopt($curl, CURLOPT_HTTPAUTH, 'Basic YW5kZXJzOmFuZGVycw==');
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        return curl_exec($curl);
    }

    public function fetch($requestURL)
    {
        try {
            return $this->callAPI('GET', $requestURL, "Content-Type: application/hal+json");
        } catch (Exception $e) {
            return $e;
        }
    }
}

$blogger = new Blogger();
$data = json_decode($blogger->fetch('http://api.robbestad.com/robbestad'), true);
$articleNumber=$data['_embedded']['robbestad'][0]["id"];
if(empty($_GET["id"])){
 $articleNumber=0;
} else {
for($i=0;$i<count($data['_embedded']['robbestad']);$i++){
    if($data['_embedded']['robbestad'][$i]["id"]===$_GET["id"]){
        $articleNumber=$i;
            break;
    }
}
}
?>
<!DOCTYPE html>
<head>
    <meta http-equiv='Content-type' content='text/html; charset=utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="<?php echo $json["name"]; ?> <?php echo $json["version"]; ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <title><?php echo $json["name"]; ?></title>
    <link href="css/style.min.css" type="text/css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <script src="//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"></script>
    <script>
        WebFont.load({
            google: {
                families: ['Lobster','Open Sans']
            }
        });
    </script>

</head>
<body>


<div id="layout"></div>
<div id="masthead"></div>

<div class="container-fluid" >
    <div id="react-root"></div>

    <div class="header hidden-xs">
        <ul class="nav nav-pills pull-right">
            <li class="active"><a href="/index.php"><?php echo $l_hjem; ?></a></li>
            <li><a href="http://www.robbestad.com"><?php echo $l_om; ?></a></li>
            <li><a href="mailto:anders@robbestad.com"><?php echo $l_kontakt; ?></a></li>
        </ul>
        <a href="/index.php">
        <h1 class="text-muted" id="content">Headline</h1>
        </a>
    </div>

    <div class="row">
        <div class="col-md-3 col-sm-4 col-lg-3 hidden-xs sidebar">
            <?php foreach ($data["_embedded"]["robbestad"] as $item) {
                echo '<h2><a
                    href="/index.php?id=' . $item["id"] . '#nosplash">' . ($item["title"] . '</a></h2><hr>');
            }
            ?>

        </div>
        <div class="article col-sm-8 col-md-9 col-lg-10 col-xs-12">
                <div class="innerXsPadding">
                <h1><?php echo $data["_embedded"]["robbestad"][$articleNumber]["title"]; ?></h1>
                <?php echo $data["_embedded"]["robbestad"][$articleNumber]["content"]; ?>
<!--            <div id="disqus_thread"></div>-->
<!--            <script type="text/javascript">-->
<!--                /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */-->
<!--                var disqus_shortname = 'robbestadcom'; // required: replace example with your forum shortname-->
<!---->
<!--                /* * * DON'T EDIT BELOW THIS LINE * * */-->
<!--                (function () {-->
<!--                    var dsq = document.createElement('script');-->
<!--                    dsq.type = 'text/javascript';-->
<!--                    dsq.async = true;-->
<!--                    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';-->
<!--                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);-->
<!--                })();-->
<!--            </script>-->
<!--            <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by-->
<!--                    Disqus.</a></noscript>-->
<!--            <a href="http://disqus.com" class="dsq-brlink">comments powered by <span-->
<!--                    class="logo-disqus">Disqus</span></a>-->
        </div>
        </div>
    </div>
    <!-- /div.container -->

    <div id="myfooter"></div>
</body>

<!-- Zynga Scroller -->
<script type="text/javascript" src="http://zynga.github.io/scroller/src/Raf.js"></script>
<script type="text/javascript" src="http://zynga.github.io/scroller/src/Animate.js"></script>
<script type="text/javascript" src="http://zynga.github.io/scroller/src/Scroller.js"></script>

<!-- Contains jQuery, React and compiled js (included jsx) -->
<script type="text/javascript" src="./js/libs.min.js"></script>
<script type="text/javascript" src="./js/app.js"></script>
<!--<script type="text/javascript" src="./js/blogdata.min.js"></script>-->
