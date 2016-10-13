<?php

/* KoolawaCoreBundle::layout.html.twig */
class __TwigTemplate_25a4190fef994d05ab3ac2cc149c63fae8a97dd12df8c1c31867cf51c1ff3117 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'head' => array($this, 'block_head'),
            'body' => array($this, 'block_body'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_40eddd8058110490ef3d01fc9130b22f7b78b77b2b90f4053f4f5df984ac0de8 = $this->env->getExtension("native_profiler");
        $__internal_40eddd8058110490ef3d01fc9130b22f7b78b77b2b90f4053f4f5df984ac0de8->enter($__internal_40eddd8058110490ef3d01fc9130b22f7b78b77b2b90f4053f4f5df984ac0de8_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "KoolawaCoreBundle::layout.html.twig"));

        // line 2
        echo "
<!DOCTYPE HTML>
<html>
  <head>
    <meta charset=\"utf-8\">
    <title>";
        // line 7
        $this->displayBlock('title', $context, $blocks);
        echo "</title>

    ";
        // line 9
        if (isset($context['assetic']['debug']) && $context['assetic']['debug']) {
            // asset "9df6fbd_0"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_9df6fbd_0") : $this->env->getExtension('asset')->getAssetUrl("css/9df6fbd_part_1_ext-theme-neptune-all-01_1.css");
            // line 10
            echo "    <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "9df6fbd_1"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_9df6fbd_1") : $this->env->getExtension('asset')->getAssetUrl("css/9df6fbd_part_1_ext-theme-neptune-all-02_2.css");
            echo "    <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
            // asset "9df6fbd_2"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_9df6fbd_2") : $this->env->getExtension('asset')->getAssetUrl("css/9df6fbd_part_1_jquery-ui_3.css");
            echo "    <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
        } else {
            // asset "9df6fbd"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_9df6fbd") : $this->env->getExtension('asset')->getAssetUrl("css/9df6fbd.css");
            echo "    <link rel=\"stylesheet\" href=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\" />
    ";
        }
        unset($context["asset_url"]);
        // line 12
        echo "
    ";
        // line 13
        if (isset($context['assetic']['debug']) && $context['assetic']['debug']) {
            // asset "c3767ae_0"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c3767ae_0") : $this->env->getExtension('asset')->getAssetUrl("js/c3767ae_part_1_ext-all_1.js");
            // line 14
            echo "    <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c3767ae_1"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c3767ae_1") : $this->env->getExtension('asset')->getAssetUrl("js/c3767ae_part_1_ext-neptune_2.js");
            echo "    <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c3767ae_2"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c3767ae_2") : $this->env->getExtension('asset')->getAssetUrl("js/c3767ae_part_1_jquery-2.1.4.min_3.js");
            echo "    <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c3767ae_3"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c3767ae_3") : $this->env->getExtension('asset')->getAssetUrl("js/c3767ae_part_1_jquery-scrollto_4.js");
            echo "    <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c3767ae_4"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c3767ae_4") : $this->env->getExtension('asset')->getAssetUrl("js/c3767ae_part_1_jquery-ui_5.js");
            echo "    <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c3767ae_5"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c3767ae_5") : $this->env->getExtension('asset')->getAssetUrl("js/c3767ae_part_1_jquery.caret_6.js");
            echo "    <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c3767ae_6"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c3767ae_6") : $this->env->getExtension('asset')->getAssetUrl("js/c3767ae_part_1_jquery.md5_7.js");
            echo "    <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c3767ae_7"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c3767ae_7") : $this->env->getExtension('asset')->getAssetUrl("js/c3767ae_part_1_jquery.mousewheel_8.js");
            echo "    <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c3767ae_8"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c3767ae_8") : $this->env->getExtension('asset')->getAssetUrl("js/c3767ae_part_1_jquery.resize_9.js");
            echo "    <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
            // asset "c3767ae_9"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c3767ae_9") : $this->env->getExtension('asset')->getAssetUrl("js/c3767ae_part_1_mwheelIntent_10.js");
            echo "    <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
        } else {
            // asset "c3767ae"
            $context["asset_url"] = isset($context['assetic']['use_controller']) && $context['assetic']['use_controller'] ? $this->env->getExtension('routing')->getPath("_assetic_c3767ae") : $this->env->getExtension('asset')->getAssetUrl("js/c3767ae.js");
            echo "    <script type=\"text/javascript\" src=\"";
            echo twig_escape_filter($this->env, (isset($context["asset_url"]) ? $context["asset_url"] : $this->getContext($context, "asset_url")), "html", null, true);
            echo "\"></script>
    ";
        }
        unset($context["asset_url"]);
        // line 16
        echo "
    ";
        // line 17
        $this->displayBlock('head', $context, $blocks);
        // line 19
        echo "  </head>
  <body>

    ";
        // line 22
        $this->displayBlock('body', $context, $blocks);
        // line 24
        echo "
  </body>
</html>
";
        
        $__internal_40eddd8058110490ef3d01fc9130b22f7b78b77b2b90f4053f4f5df984ac0de8->leave($__internal_40eddd8058110490ef3d01fc9130b22f7b78b77b2b90f4053f4f5df984ac0de8_prof);

    }

    // line 7
    public function block_title($context, array $blocks = array())
    {
        $__internal_9fb982da7ba732c5fe9b49503b29bd4e27a8fa9a1fd785d94f4374a45f17a81d = $this->env->getExtension("native_profiler");
        $__internal_9fb982da7ba732c5fe9b49503b29bd4e27a8fa9a1fd785d94f4374a45f17a81d->enter($__internal_9fb982da7ba732c5fe9b49503b29bd4e27a8fa9a1fd785d94f4374a45f17a81d_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        echo "Koolawa Apps";
        
        $__internal_9fb982da7ba732c5fe9b49503b29bd4e27a8fa9a1fd785d94f4374a45f17a81d->leave($__internal_9fb982da7ba732c5fe9b49503b29bd4e27a8fa9a1fd785d94f4374a45f17a81d_prof);

    }

    // line 17
    public function block_head($context, array $blocks = array())
    {
        $__internal_d586fb6755ba479a3dc2bbfc1ca2e5a69e3faf7d1dc81bfd2f1c308648e4cd56 = $this->env->getExtension("native_profiler");
        $__internal_d586fb6755ba479a3dc2bbfc1ca2e5a69e3faf7d1dc81bfd2f1c308648e4cd56->enter($__internal_d586fb6755ba479a3dc2bbfc1ca2e5a69e3faf7d1dc81bfd2f1c308648e4cd56_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "head"));

        // line 18
        echo "    ";
        
        $__internal_d586fb6755ba479a3dc2bbfc1ca2e5a69e3faf7d1dc81bfd2f1c308648e4cd56->leave($__internal_d586fb6755ba479a3dc2bbfc1ca2e5a69e3faf7d1dc81bfd2f1c308648e4cd56_prof);

    }

    // line 22
    public function block_body($context, array $blocks = array())
    {
        $__internal_d370249320d20e83d21f8b3d77a8ef89ec6aba136177ee5a964d0799e8008fb6 = $this->env->getExtension("native_profiler");
        $__internal_d370249320d20e83d21f8b3d77a8ef89ec6aba136177ee5a964d0799e8008fb6->enter($__internal_d370249320d20e83d21f8b3d77a8ef89ec6aba136177ee5a964d0799e8008fb6_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        // line 23
        echo "    ";
        
        $__internal_d370249320d20e83d21f8b3d77a8ef89ec6aba136177ee5a964d0799e8008fb6->leave($__internal_d370249320d20e83d21f8b3d77a8ef89ec6aba136177ee5a964d0799e8008fb6_prof);

    }

    public function getTemplateName()
    {
        return "KoolawaCoreBundle::layout.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  195 => 23,  189 => 22,  182 => 18,  176 => 17,  164 => 7,  154 => 24,  152 => 22,  147 => 19,  145 => 17,  142 => 16,  74 => 14,  70 => 13,  67 => 12,  41 => 10,  37 => 9,  32 => 7,  25 => 2,);
    }
}
/* {# src/OC/PlatformBundle/Resources/views/layout.html.twig #}*/
/* */
/* <!DOCTYPE HTML>*/
/* <html>*/
/*   <head>*/
/*     <meta charset="utf-8">*/
/*     <title>{% block title %}Koolawa Apps{% endblock %}</title>*/
/* */
/*     {% stylesheets '@KoolawaCoreBundle/Resources/public/css/*.css' filter='cssrewrite, yui_css' %}*/
/*     <link rel="stylesheet" href="{{ asset_url }}" />*/
/*     {% endstylesheets %}*/
/* */
/*     {% javascripts '@KoolawaCoreBundle/Resources/public/js/*.js' filter='' %}*/
/*     <script type="text/javascript" src="{{ asset_url }}"></script>*/
/*     {% endjavascripts %}*/
/* */
/*     {% block head %}*/
/*     {% endblock %}*/
/*   </head>*/
/*   <body>*/
/* */
/*     {% block body %}*/
/*     {% endblock %}*/
/* */
/*   </body>*/
/* </html>*/
/* */
