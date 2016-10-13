<?php

/* WebProfilerBundle:Profiler:header.html.twig */
class __TwigTemplate_317ba82c4d71f3d5239353a6753ee97410a7a22ab13920cd85ac8cae6f022381 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_652f830de9bfed3ea8fbd9c886c878964d09c8edb6ac3c9c47d46dda92ed85f5 = $this->env->getExtension("native_profiler");
        $__internal_652f830de9bfed3ea8fbd9c886c878964d09c8edb6ac3c9c47d46dda92ed85f5->enter($__internal_652f830de9bfed3ea8fbd9c886c878964d09c8edb6ac3c9c47d46dda92ed85f5_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "WebProfilerBundle:Profiler:header.html.twig"));

        // line 1
        echo "<div id=\"header\">
    <div class=\"container\">
        <h1>";
        // line 3
        echo twig_include($this->env, $context, "@WebProfiler/Icon/symfony.svg");
        echo " Symfony <span>Profiler</span></h1>

        <div class=\"search\">
            <form method=\"get\" action=\"https://symfony.com/search\" target=\"_blank\">
                <div class=\"form-row\">
                    <input name=\"q\" id=\"search-id\" type=\"search\" placeholder=\"search on symfony.com\">
                    <button type=\"submit\" class=\"btn\">Search</button>
                </div>
           </form>
        </div>
    </div>
</div>
";
        
        $__internal_652f830de9bfed3ea8fbd9c886c878964d09c8edb6ac3c9c47d46dda92ed85f5->leave($__internal_652f830de9bfed3ea8fbd9c886c878964d09c8edb6ac3c9c47d46dda92ed85f5_prof);

    }

    public function getTemplateName()
    {
        return "WebProfilerBundle:Profiler:header.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  26 => 3,  22 => 1,);
    }
}
/* <div id="header">*/
/*     <div class="container">*/
/*         <h1>{{ include('@WebProfiler/Icon/symfony.svg') }} Symfony <span>Profiler</span></h1>*/
/* */
/*         <div class="search">*/
/*             <form method="get" action="https://symfony.com/search" target="_blank">*/
/*                 <div class="form-row">*/
/*                     <input name="q" id="search-id" type="search" placeholder="search on symfony.com">*/
/*                     <button type="submit" class="btn">Search</button>*/
/*                 </div>*/
/*            </form>*/
/*         </div>*/
/*     </div>*/
/* </div>*/
/* */
